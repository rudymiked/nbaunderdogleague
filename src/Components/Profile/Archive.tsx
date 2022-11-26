import React from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { GetArchiveSummary } from "../../services/data/GetRequests";
import { RootContext } from "../../services/Stores/RootStore";
import { Loading } from "../Shared/Loading";
import { Error } from "../Error/Error";
import { sortCaretFunc } from "../../Utils/Utils";

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
    }, [state]);

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
		},
		{
			dataField: 'score',
			text: 'Score',
            sort: true,
			sortCaret: sortCaretFunc,
		},
	];

    return (
        <>
            {!archiveSummaryDataLoaded ? ( 
                <Loading />
                ) : (!dataFailedToLoad ? (
                    <BootstrapTable
                        keyField='email'
                        data={archiveSummaryData}
                        columns={columns} />
                    ) : (
                        <Error />
                    )
                )
            }
        </>
    );
}