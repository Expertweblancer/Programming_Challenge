import './App.css';
import React from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import axios from 'axios'

const SERVER_PORT = 5001;
const SERVER_BASE_URL = `http://localhost:${SERVER_PORT}/`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    async handleGenerateClick() {
        await axios.get(SERVER_BASE_URL + "generateFile");
        console.log("Generate is handled");
    }

    async handleReportClick() {
        let res = await axios.get(SERVER_BASE_URL + "randomStats");
        console.log(res.data);

        let reportSpace = document.getElementById("ReportSpace");

        reportSpace.innerHTML = `Alphabetical string: ${res.data["alphabetic"]} <br> Real numbers: ${res.data["real_num"]}
        <br> Integers: ${res.data["integers"]}
        <br> Alphanumerics: ${res.data["alphanumerics"]}
`;

    }

    render() {
        return (
            <div className="App">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    p={10}
                    style={{margin: "auto", border: "solid black 1px", width: "50%"}}
                >
                    <Grid item style={{marginBottom: "15px"}}>
                        <Button variant="outlined" onClick={this.handleGenerateClick}>Generate</Button>
                    </Grid>

                    <Grid item style={{marginBottom: "15px"}}>
                        <span>Link: <a href={SERVER_BASE_URL + "downloadRandom"}>to the file</a></span>
                    </Grid>

                    <Grid item style={{marginBottom: "15px"}}>
                        <Button variant="outlined" onClick={this.handleReportClick}>Report</Button>
                    </Grid>

                    <Grid item>
                        <p id={"ReportSpace"}>
                        </p>
                    </Grid>

                </Grid>

            </div>
        );
    }
}

export default App;
