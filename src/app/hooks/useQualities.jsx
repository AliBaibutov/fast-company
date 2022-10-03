import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualities();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getQualities() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getQuality(idArr) {
        const foundQuals = [];
        idArr.map((id) => foundQuals.push(qualities.find((q) => q._id === id)));
        return foundQuals;
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualitiesContext.Provider value={{ qualities, isLoading, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
