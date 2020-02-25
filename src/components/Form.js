import React, { Component } from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: " ",
      poster: " ",
      comment: " "
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitForm(e) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };
    const url = "https://post-a-form.herokuapp.com/api/movies";
    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(
            `Your Favourite Movie ${this.state.title} has been successfully added!`
          );
        }
      })
      .catch(e => {
        console.error(e);
        alert("This film could not be added.");
      });
    e.preventDefault();
  }

  render() {
    return (
      <div className="Form">
        <h1>My Favourite Film</h1>

        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Film Information</legend>
            <div className="form-data">
              <label htmlFor="title">Name of Film:</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>
            <div className="form-data">
              <label htmlFor="poster">Enter Link for Film Poster:</label>
              <input
                type="text"
                id="poster"
                name="poster"
                onChange={this.onChange}
                value={this.state.poster}
              />
            </div>
            <div className="form-data">
              <label>
                Please enter a comment - why do you like this movie? what made
                it stand out?
                <textarea
                  type="textarea"
                  id="comment"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.onChange}
                />
              </label>
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Send" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Form;
