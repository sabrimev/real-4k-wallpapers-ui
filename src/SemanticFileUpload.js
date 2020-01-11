import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Button,
    Segment,
    Divider,
    Tab,
    Table,
    Message,
    Checkbox,
    Form,
    Icon,
    Input,
    Dropdown,
    Dimmer,
    Loader,
    Label,
    Progress
} from "semantic-ui-react";

import addYears from "date-fns/add_years";
import format from "date-fns/format";

import "./App.css";
import axios from "axios";
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

mock.onPost("/file/upload/enpoint").reply(200);

let d = addYears(new Date("2015-01-01T00:00"), 1);
let f = format(d, "YYYY-MM-DD");

export default class SemanticFileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file4K: null,
            fileHD: null,
            fileThumbnail: null,
            fileName4K: "",
            fileNameHD: "",
            fileNameThumbnail: "",
            isPremium: false,
            password: '',
            source: '',
            isUploading: false,
            statusCode: ""
        };
    }

    onFormSubmit = e => {
        e.preventDefault(); // Stop form submit
        console.log("form submit");
        this.fileUploadFetch(this.state.file4K,
            this.state.fileHD,
            this.state.fileThumbnail,
            this.state.isPremium,
            this.state.password,
            this.state.source);
    };

    fileChange4K = e => {
        this.setState(
            { file4K: e.target.files[0], fileName4K: e.target.files[0].name },
            () => {
                console.log(
                    "File chosen --->",
                    this.state.file4K,
                    console.log("File name  --->", this.state.fileName4K)
                );
            }
        );
    };

    fileChangeHD = e => {
        this.setState(
            { fileHD: e.target.files[0], fileNameHD: e.target.files[0].name },
            () => {
                console.log(
                    "File chosen --->",
                    this.state.fileHD,
                    console.log("File name  --->", this.state.fileNameHD)
                );
            }
        );
    };

    fileChangeThumbnail = e => {
        this.setState(
            { fileThumbnail: e.target.files[0], fileNameThumbnail: e.target.files[0].name },
            () => {
                console.log(
                    "File chosen --->",
                    this.state.fileThumbnail,
                    console.log("File name  --->", this.state.fileNameThumbnail)
                );
            }
        );
    };

    fileUpload = async (file4k,
        fileHD,
        fileThumbnail,
        isPremium,
        password,
        source) => {
        const formData = new FormData();
        formData.append('Image4k', file4k);
        formData.append('ImageHD', fileHD);
        formData.append('ImageThumbnail', fileThumbnail);

        formData.append('Password', password);
        formData.append('IsPremium', isPremium);
        formData.append('Source', source);
        formData.append('Categories', 1);

        try {
            axios.post({
                method: 'post',
                url: 'https://localhost:5001/wallpaper/UploadImage',
                data: formData,
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {
                console.log(response);
                console.log(response.status);
                this.setState({ statusCode: response.status }, () => {
                    console.log(
                        "This is the response status code --->",
                        this.state.statusCode
                    );
                });
            });
        } catch (error) {
            console.error(Error(`Error uploading file ${error.message}`));
        }
    };


    fileUploadFetch = async (file4k,
        fileHD,
        fileThumbnail,
        isPremium,
        password,
        source) => {
        const formData = new FormData();
        formData.append('Image4k', file4k);
        formData.append('ImageHD', fileHD);
        formData.append('ImageThumbnail', fileThumbnail);

        formData.append('Password', password);
        formData.append('IsPremium', isPremium);
        formData.append('Source', source);
        formData.append('Categories', 1);



        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'POST',
                body: formData
            };

            fetch("https://localhost:5001/wallpaper/UploadImage", requestOptions)
                .then(response => {
                    console.log(response);
                    console.log(response.status);
                    this.setState({ statusCode: response.status }, () => {
                        console.log(
                            "This is the response status code --->",
                            this.state.statusCode
                        );
                    });
                    return response.text()
                })
                .then(result => console.log(result))
                .catch(error => {
                    console.log('error', error)
                    this.setState({ statusCode: 500 }, () => {
                        console.log(
                            "This is the response status code --->",
                            this.state.statusCode
                        );
                    });
                } );

        } catch (error) {
            console.error(Error(`Error uploading file ${error.message}`));
            this.setState({ statusCode: 500 }, () => {
                console.log(
                    "This is the response status code --->",
                    this.state.statusCode
                );
            });
        }
    };

    onPasswordChange = e => {
        console.log('onPasswordChange')
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }

    onSourceChange = e => {
        console.log('onSourceChange')
        this.setState({
            source: e.target.value
        })

        console.log(this.state.source)
    }

    onPremiumChange = e => {
        console.log('onSourceChange' + e.target.value)
        this.setState({
            isPremium: !this.state.isPremium
        })
    }

    render() {
        const { statusCode } = this.state;
        const panes = [
            {
                menuItem: "Import ",
                render: () => (
                    <Tab.Pane attached={false} className="Testo">
                        <Message>Provide all information below</Message>
                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Field>

                                <Form.Checkbox
                                    label='Premium'
                                    checked={this.state.isPremium}
                                    fluid
                                    placeholder="Premium"
                                    value={this.state.isPremium}
                                    onChange={this.onPremiumChange}
                                />

                                <Form.Input
                                    fluid
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onPasswordChange}
                                />

                                <Form.Input
                                    fluid
                                    placeholder="Source"
                                    value={this.state.source}
                                    onChange={this.onSourceChange}
                                />

                                <Button as="label" htmlFor="file4K" type="button" animated="fade">
                                    <Button.Content visible>
                                    </Button.Content>
                                    <Button.Content >Choose 4K Wallpaper</Button.Content>
                                </Button>
                                <input
                                    type="file"
                                    id="file4K"
                                    hidden
                                    onChange={this.fileChange4K}
                                />
                                <Form.Input
                                    fluid
                                    placeholder="Use the above bar to browse your file system"
                                    readOnly
                                    value={this.state.fileName4K}
                                />


                                <Button as="label" htmlFor="fileHD" type="button" animated="fade">
                                    <Button.Content >Choose HD Wallpaper</Button.Content>
                                </Button>
                                <input
                                    type="file"
                                    id="fileHD"
                                    hidden
                                    onChange={this.fileChangeHD}
                                />
                                <Form.Input
                                    fluid
                                    placeholder="Use the above bar to browse your file system"
                                    readOnly
                                    value={this.state.fileNameHD}
                                />

                                <Button as="label" htmlFor="fileThumbnail" type="button" animated="fade">
                                    <Button.Content >Choose Thumbnail Wallpaper</Button.Content>
                                </Button>
                                <input
                                    type="file"
                                    id="fileThumbnail"
                                    hidden
                                    onChange={this.fileChangeThumbnail}
                                />
                                <Form.Input
                                    fluid
                                    placeholder="Use the above bar to browse your file system"
                                    readOnly
                                    value={this.state.fileNameThumbnail}
                                />




                                <Button style={{ marginTop: "20px" }} type="submit">
                                    Upload
                                </Button>
                                {statusCode && statusCode === 200 ? (
                                    <Progress
                                        style={{ marginTop: "20px" }}
                                        percent={100}
                                        success
                                        progress
                                    >
                                        File Upload Success
                                    </Progress>
                                ) : statusCode && statusCode === 500 ? (
                                    <Progress
                                        style={{ marginTop: "20px" }}
                                        percent={100}
                                        error
                                        active
                                        progress
                                    >
                                        File Upload Failed
                                    </Progress>
                                ) : statusCode && statusCode === 401 ? (
                                    <Progress
                                        style={{ marginTop: "20px" }}
                                        percent={0}
                                        error
                                        active
                                        progress
                                    >
                                        Wrong password
                                    </Progress>
                                ): null}
                            </Form.Field>
                        </Form>
                    </Tab.Pane>
                )
            }
        ];
        return (
            <Segment style={{ padding: "2em 1em" }} vertical>
                <Divider horizontal>REAL 4K WALLPAPERS FILE UPLOAD SERVICE</Divider>
                <Tab menu={{ pointing: true }} panes={panes} />
            </Segment>
        );
    }
}