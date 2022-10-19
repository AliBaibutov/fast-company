import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "loading...";
    return qualities.map((qual) =>
        typeof qual === "string" ? (
            <Quality key={qual} id={qual} />
        ) : (
            <Quality key={qual.value} id={qual.value} />
        )
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
