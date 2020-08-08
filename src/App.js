import React, { Component } from "react";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "", items: [], error: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var url = "http://127.0.0.1:5000/salary?num=" + this.state.value;
        fetch(url)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result,
                    });
                    console.log(result);
                },
                (error) => {
                    this.setState({
                        error: error,
                    });
                }
            );
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <h5 className="card-header">
                                    Salary converter
                                </h5>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="num"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                placeholder="Enter your salary"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                    <div className="card-title">Result:</div>
                                    {this.state.items.map((item) => (
                                        <div key="1" className="card-text">
                                            <b>KB</b> = {item.KB}
                                            <br />
                                            MB = {item.MB}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
