import React, { useCallback, useEffect, useState } from "react";

import apiData, { allItemsCount } from "../../services/api";
import PersonInfoType from "../../types/PersonInfoType";
import Loader from "../Loader/Loader";
import SelectedItems from "../SelectedItems";
import Buttons from "../Buttons/Buttons";
import MainList from "../MainList";

function App() {
    const [ data, setData ] = useState<PersonInfoType[]>([]);
    const [ selected, setSelected ] = useState<string[]>([]);
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ loadMoreBtn, setLoadMoreBtn ] = useState<boolean>(false);

    const dataLoadedCount = data.length;

    const handleCardClick = (card: PersonInfoType) => {
        setSelected(prevState => (
            prevState.indexOf(card.id) > -1
                ? prevState.filter(id => id !== card.id)
                : [ ...prevState, card.id ]
        ));
    };

    const loadData = useCallback(() => {
        setLoading(true);
        setError(null);
        setLoadMoreBtn(false);

        apiData()
            .then(data => setData(prevData => prevData.concat(data)))
            .catch(() => setError("load-error"))
            .finally(() => setLoading(false));
    }, []);

    const handleEdgeScroll = useCallback((isNearEnd: boolean) => {
        const showLoadBtn = isNearEnd && (dataLoadedCount < allItemsCount);
        setLoadMoreBtn(showLoadBtn);
    }, [ dataLoadedCount ]);

    useEffect(() => {
        loadData();
    }, [ loadData ]);

    return (
        <div className="container">
            {loading && <Loader/>}

            <SelectedItems
                data={data}
                selected={selected}
            />

            {dataLoadedCount > 0 && (
                <MainList
                    data={data}
                    selected={selected}
                    handleCardClick={handleCardClick}
                    handleEdgeScroll={handleEdgeScroll}
                />
            )}

            <Buttons
                loadData={loadData}
                loadMoreBtn={loadMoreBtn}
                error={error}
            />
        </div>
    );
}

export default App;
