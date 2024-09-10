import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { GetArchiveSummary } from "../../services/data/GetRequests";
import { RootContext } from "../../services/Stores/RootStore";
import { Loading } from "../Shared/Loading";
import { SomethingWentWrong } from "../Error/SomethingWentWrong";
import { sortCaretFunc } from "../../Utils/Utils";
import { Link, useNavigate } from "react-router-dom";
import { CURRENT_YEAR, NBA_END_DATE } from "../../Utils/AppConstants";

interface IArchiveProps {}

interface IArchiveSummaryData {
    email: string;
    year: number;
    governor: string;
    groupId: string;
    groupName: string;
    score: number;
    standing: number;
    teamCity: string;
    teamName: string;
}
interface IArchiveSummaryResponse {
    data: IArchiveSummaryData[];
}

export const ArchiveSummary: React.FunctionComponent<IArchiveProps> = (props: IArchiveProps) => {
    const [archiveSummaryData, SetArchiveSummaryData] = React.useState<IArchiveSummaryData[]>([]);
	const [archiveSummaryDataLoaded, SetArchiveSummaryDataLoaded] = React.useState<boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
    
    const { state, dispatch } = React.useContext(RootContext);

    const navigate = useNavigate();

    React.useEffect(() => {
		if (state.AppStore.Email !== "") {
			SetArchiveSummaryDataLoaded(false);
			GetArchiveSummary(state.AppStore.Email).then((response: IArchiveSummaryResponse) => {
				if (response?.data) {
					const data = response?.data;

					if (data!.length > 0) {
						const sortedData = data!.sort((a: IArchiveSummaryData, b: IArchiveSummaryData) => (a.year > b.year) ? 1 : -1);
						
						// remove current season from archive results
						const currentDate = new Date(Date.now());
						if (currentDate.getTime() < NBA_END_DATE.getTime()) {
							sortedData.pop();
						}
					}

					SetArchiveSummaryDataLoaded(true);
					SetArchiveSummaryData(data);
				}
			}).catch((reason: any) => {
				console.log(reason);
				SetArchiveSummaryDataLoaded(true);
				SetDataFailedToLoad(true);
			});
		}
    }, []);

    const columns: ColumnDescription[] = [
		{
			dataField: 'year',
			text: 'Year',
            sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'governor',
			text: 'Governor',
            sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'teamName',
			text: 'Team',
            sort: true,
			sortCaret: sortCaretFunc,
		},
		{
			dataField: 'standing',
			text: 'Standing',
            sort: true,
			sortCaret: sortCaretFunc,
            style: (cell, row, rowIndex, colIndex) => {
				switch (row.standing) {
					case 1: 
						return { backgroundColor: '#ECD122' }
					case 2: 
						return { backgroundColor: '#C0C0C0' }
					case 3: 		
                        return { backgroundColor: '#cd7f32' }		
					default: 
						return { }
				}
			}
		},
		{
			dataField: 'score',
			text: 'Score',
            sort: true,
			sortCaret: sortCaretFunc,
            style: (cell, row, rowIndex, colIndex) => {
				// color scale for points
				const score: number = row.score
				switch (true) {
					case score < .5: 
						return { backgroundColor: '#D92828' }
					case score < .75: 
						return { backgroundColor: '#D94628' }
					case score < 1: 
						return { backgroundColor: '#F67B43' }
					case score < 1.25: 
						return { backgroundColor: '#F6E743' }
					case score < 1.5: 
						return { backgroundColor: '#D9F643' }
					case score < 2: 
						return { backgroundColor: '#77F643' }					
					default: 
						return { backgroundColor: '#43F657' }
				}
			}
		},
        {
            dataField: "actions",
            text: "Group",
            isDummyField: true,
            formatter: (cell, row) => 
				<Link to={'/archive'} state={{ groupId: row.groupId, groupName: row.groupName, year: row.year }}>
					{row.groupName}
				</Link>
		},
	];

    return (
        <div style={{overflow: 'auto'}}>
            {!archiveSummaryDataLoaded ? ( 
                <Loading />
                ) : (!dataFailedToLoad ? (
                    <BootstrapTable
                        keyField='year'
						defaultSorted={[
							{
								dataField: 'year',
								order: 'desc' 
							}]}
                        data={archiveSummaryData}
                        columns={columns}
                    />
                    ) : (
                        <SomethingWentWrong />
                    )
                )
            }
        </div>
    );
}