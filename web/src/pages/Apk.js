import React from "react";
import { Box } from "@mui/material";
import { FaMobileAlt } from "react-icons/fa"
import { Link } from "react-router-dom";

import LoadingButton from '@mui/lab/LoadingButton';

export default class ApkDownloader extends React.Component {

    constructor(props, page) {
        super(props);
        this.page = props.page
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log("downloading...")
    }

    render() {
        return (
            <Box sx={{ pb: 2, mx: 2 }} style={{ justifyContent: 'center', display: 'flex' }}>
                <Link to="../../apk_vol/client.apk" target="_blank" download>
                    <LoadingButton
                        color="secondary"
                        onClick={this.handleClick}
                        loading={false}
                        loadingPosition="start"
                        startIcon={<FaMobileAlt />}
                        variant="contained">
                        Download our apk
                    </LoadingButton>
                </Link>
            </Box>
        )
    }
}