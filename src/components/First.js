import React, { Component } from 'react'
import axios from 'axios'
import Second from './Second'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class First extends Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            category: '',
            level: '',
            question: '',
            responseQuestions: []
        }
    }

    componentDidMount() {
        this.getCategory()
    }

    getCategory = () => {
        axios.get('https://opentdb.com/api_category.php')
            .then(response => {
                this.setState({ posts: response.data.trivia_categories })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log("ds")
        e.preventDefault()
        axios.get('https://opentdb.com/api.php?amount='+this.state.question+'&category='+this.state.category+
        '&difficulty='+this.state.level+'&type=multiple')
            .then(response => {
                console.log(response)
                this.setState({
                    responseQuestions: response.data.results
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        console.log(this.state.responseQuestions)

        const { responseQuestions } = this.state.responseQuestions; 
        return (
            <div>

            <Second responseQuestions={responseQuestions}/>

              <Router>
                  <Route path="./Second" component={Second}/>
              </Router>

                <form class="form" onSubmit={this.handleSubmit}>

                <label class="n1">Name</label> <br/>
                 <input class="name" type="text"/>
                 <br/>

                 <label class="c1">Category</label> <br/>
                    <select class="category" value="" name="category" onChange = {this.handleChange}>
                        {
                            this.state.posts.map((post, key) => (
                                <option value={post.id}>{post.name}</option>
                            ))
                        } {this.state.category}
                    </select><br/>
                    <label class="l1">Level</label> <br/>
                    <div>
                        <select class="level" name="level" onChange = {this.handleChange}>
                            <option value="any">Any level</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select> 
                    </div>
                    <label class="q1">Questions</label> <br/>
                    <input class="question" type="number" name="question" onChange = {this.handleChange} />
                    <br/>
                    <button class="btn">Submit</button>
                </form>
                <div>
                    
                    {
                        this.state.responseQuestions.map((question, key) => (
                            <>
                                <p>{key} {question.question}</p>
                                <div>
                                    <input type="radio" id={key} value=""/>
                                    {question.correct_answer}
                                    <br></br>
                                    {
                                        question.incorrect_answers.map((incorrect, ikey) => (
                                            <>
                                                <input type="radio" id={key} value=""/>
                                                {incorrect}
                                                <br></br>
                                            </>
                                        ))
                                    }
                                </div>
                                <br></br>
                                
                            </>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default First
