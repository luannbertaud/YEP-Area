import React from "react";
import { Box } from "@mui/material";
import { FaMobileAlt } from "react-icons/fa"


import LoadingButton from '@mui/lab/LoadingButton';

export default class ApkDownloader extends React.Component {

    constructor(props, page) {
        super(props);
        this.page = props.page
        this.Popup = this.Popup.bind(this)

    }

    Popup(page) {
        window.open(page,"_blank","menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=500");
    }

    render() {
        return (
            <Box sx={{ pb: 2, mx: 2 }} style={{ justifyContent: 'center', display: 'flex' }}>
                <LoadingButton
                    color="secondary"
                    onClick={() => this.Popup("https://api.yep-area.cf/client.apk")}
                    loading={false}
                    loadingPosition="start"
                    startIcon={<FaMobileAlt />}
                    variant="contained">
                    Download our apk
                </LoadingButton>
            </Box>
        )
    }
}