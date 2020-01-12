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
    Progress,
    Image
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

var receivedCategories = [];

export default class SemanticFileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePreview: null,
            categories: [],
            categoryDownloaded: false,
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
            statusCode: "",
            submitting: false
        };
        this.getCategoryFetch();// get categories
    }

    onFormSubmit = e => {
        e.preventDefault(); // Stop form submit
        console.log("form submit");


        if (this.state.categories.length === 0
            || this.state.file4K == null
            || this.state.fileHD == null
            || this.state.fileThumbnail == null
            || this.state.password == "") {
            console.error(Error('Provide all the information'));
            this.setState({ statusCode: 404, submitting: false }, () => {
                console.log(
                    "Provide all the information",
                    this.state.statusCode
                );
            });
            console.log("form submit canceled");
            window.scrollTo(0, 0);
            return;
        }

        this.fileUploadFetch(this.state.file4K,
            this.state.fileHD,
            this.state.fileThumbnail,
            this.state.isPremium,
            this.state.password,
            this.state.source,
            this.state.categories);

        this.setState({ submitting: true })
        window.scrollTo(0, 0);
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
            { imagePreview: URL.createObjectURL(e.target.files[0]),  fileThumbnail: e.target.files[0], fileNameThumbnail: e.target.files[0].name },
            () => {
                console.log(
                    "File chosen --->",
                    this.state.fileThumbnail,
                    console.log("File name  --->", this.state.fileNameThumbnail)
                );
            }
        );
    };

    getCategoryFetch = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://wallpaper.westeurope.cloudapp.azure.com/wallpaper/getAllCategory", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.setState({ category: result, categoryDownloaded: true })
                receivedCategories = JSON.parse(result)
                this.setState(this.state)
            })
            .catch(error => console.log('error', error));
    }

    fileUploadFetch = async (file4k,
        fileHD,
        fileThumbnail,
        isPremium,
        password,
        source,
        categories) => {
        const formData = new FormData();
        formData.append('Image4k', file4k);
        formData.append('ImageHD', fileHD);
        formData.append('ImageThumbnail', fileThumbnail);

        formData.append('Password', password);
        formData.append('IsPremium', isPremium);
        formData.append('Source', source);

        categories.map(cat => formData.append('Categories', cat))

        console.log('Sending data..')

        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'POST',
                body: formData
            };

            fetch("https://wallpaper.westeurope.cloudapp.azure.com/wallpaper/UploadImage", requestOptions)
                .then(response => {
                    console.log(response);
                    console.log(response.status);
                    //this.setState({ categories: []});//Clear state
                    this.setState({ statusCode: response.status, submitting: false }, () => {
                        console.log(
                            "This is the response status code --->",
                            this.state.statusCode
                        );
                    });
                    if (response.status === 200) {
                        this.setState(
                            {
                                submitting: false,
                                file4K: null,
                                fileHD: null,
                                fileThumbnail: null,
                                fileName4K: "",
                                fileNameHD: "",
                                fileNameThumbnail: "",
                            });
                    }

                    return response.text()
                })
                .then(result => console.log(result))
                .catch(error => {
                    console.log('error', error)
                    this.setState({ statusCode: 500, submitting: false }, () => {
                        console.log(
                            "This is the response status code-err --->",
                            this.state.statusCode
                        );
                    });
                });

        } catch (error) {
            console.error(Error(`Error uploading file ${error.message}`));
            this.setState({ statusCode: 500, submitting: false }, () => {
                console.log(
                    "This is the response status code-err2 --->",
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
        console.log('onPremiumChange : ' + !this.state.isPremium)
        this.setState({
            isPremium: !this.state.isPremium
        })
    }

    handleCategoryClick = (event, data, i) => {
        console.log(data)
        if (data.checked && !this.state.categories.includes(data.id)) {
            this.setState({
                categories: [...this.state.categories, data.id]
            })
        } else {
            if (this.state.categories.includes(data.id)) {

                var array = [...this.state.categories]; // make a separate copy of the array
                var index = array.indexOf(data.id)
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setState({ categories: array });
                }
            }
        }
        console.log('selected categories except last one: ' + this.state.categories);
    };

    render() {
        const { statusCode } = this.state;
        const panes = [
            {
                menuItem: "Import ",
                render: () => (
                    <Tab.Pane attached={false} className="Testo" loading={this.state.submitting}>


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
                                percent={0}
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
                                File Upload Failed: Wrong password
                                    </Progress>
                        ) : statusCode && statusCode === 404 ? (
                            <Progress
                                style={{ marginTop: "20px" }}
                                percent={0}
                                error
                                active
                                progress
                            >
                                Provide all the information
                                    </Progress>
                        ) : null}


                        <Message>Provide all the information below</Message>
                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field>

                                    <Form.Checkbox
                                        label='Premium wallpaper'
                                        checked={this.state.isPremium}
                                        fluid
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
                                        placeholder="file4K"
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
                                        placeholder="fileHD"
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
                                        placeholder="fileThumbnail"
                                        readOnly
                                        value={this.state.fileNameThumbnail}
                                    />

                                    <Image src={this.state.imagePreview} size='small' />


                                    <Button style={{ marginTop: "20px" }} type="submit">
                                        Upload
                                    </Button>
                                </Form.Field>
                                <Form.Field>
                                    {this.state.categoryDownloaded && receivedCategories.map((cat, i) => {
                                        return (
                                            <Form.Checkbox
                                                id={cat.id + ''}
                                                label={cat.id + '-' + cat.categoryName}
                                                onChange={(e, v) => this.handleCategoryClick(e, v, i)}
                                                name={cat.categoryName}
                                                defaultChecked={false}
                                            />
                                        );
                                    })}
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Tab.Pane>
                )
            }
        ];
        return (
            <Segment style={{ padding: "1em 1em" }} vertical>
                <Divider horizontal>REAL 4K WALLPAPERS FILE UPLOAD SERVICE</Divider>
                <Tab menu={{ pointing: true }} panes={panes} />
            </Segment>
        );
    }
}
