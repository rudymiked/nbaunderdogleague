import React from "react";
import BootstrapTable, { ColumnDescription, ExpandRowProps } from "react-bootstrap-table-next";
import { GetArchiveSummary } from "../../services/data/GetRequests";
import { RootContext } from "../../services/Stores/RootStore";
import { Loading } from "../Shared/Loading";
import { Error } from "../Error/Error";
import { sortCaretFunc } from "../../Utils/Utils";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

export const Archive: React.FunctionComponent<IArchiveProps> = (props: IArchiveProps) => {
    const [archiveSummaryData, SetArchiveSummaryData] = React.useState<IArchiveSummaryData[]>([]);
	const [archiveSummaryDataLoaded, SetArchiveSummaryDataLoaded] = React.useState<boolean>(false);
	const [dataFailedToLoad, SetDataFailedToLoad] = React.useState<boolean>(false);
    
    const { state, dispatch } = React.useContext(RootContext);

    const navigate = useNavigate();

    React.useEffect(() => {
		if (state.AppStore.GroupId !== "") {
			SetArchiveSummaryDataLoaded(false);
			GetArchiveSummary(state.AppStore.Email).then((response: IArchiveSummaryResponse) => {
				if (response?.data) {
					const data = response?.data;
					SetArchiveSummaryDataLoaded(true);
					SetArchiveSummaryData(data);
				}
			}).catch((reason: any) => {
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
			dataField: 'standings',
			text: 'Full Standings',
            sort: true,
			sortCaret: sortCaretFunc,
		},
	];

    const expandRow: ExpandRowProps<any, number> = {
        renderer: (row, rowIndex) => {
            console.log(row);
            switch (row) {
                case "standings": {
                    return <div>Full Standings</div>;
                    //  <Button
                    //             onClick={() => navigate("/standings")}
                    //             aria-controls="navigate-to-profile">
                    //             {"Join or Switch Groups"}
                    //         </Button>
                }
            }
        }
    };

    return (
        <div style={{overflow: 'auto'}}>
            {!archiveSummaryDataLoaded ? ( 
                <Loading />
                ) : (!dataFailedToLoad ? (
                    <BootstrapTable
                        keyField='year'
                        data={archiveSummaryData}
                        columns={columns} 
                        expandRow={expandRow}
                    />
                    ) : (
                        <Error />
                    )
                )
            }
        </div>
    );
}