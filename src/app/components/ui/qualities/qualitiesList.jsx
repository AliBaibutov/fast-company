import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ idArr }) => {
    const { isLoading, getQuality } = useQualities();
    const quals = getQuality(idArr);
    if (!isLoading) {
        return quals.map((qual) => <Quality key={qual._id} {...qual} />);
    } else return "loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
