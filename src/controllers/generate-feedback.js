import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';

const diffMessages = ["Very Easy", "Easy", "Average", "Hard", "Very Hard"];
const workMessages = ["Very Light Workload", "Light Workload", "Average Workload", "High Workload", "Extreme Workload"];
const interestMessages = ["Very Boring", "Slightly Boring", "Not Boring or Interesting", "Slightly Interesting", "Very Interesting"];


class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diffMessage: this.props.diffSavedRating == 0 ? "Select A Difficulty Level" : diffMessages[this.props.diffSavedRating - 1],
            workMessage: this.props.workSavedRating == 0 ? "Select A Workload Level" : workMessages[this.props.workSavedRating - 1],
            interestMessage: this.props.interestSavedRating == 0 ? "Select an Interest Level" : interestMessages[this.props.interestSavedRating - 1],
            diffValue: this.props.diffSavedRating,
            workValue: this.props.workSavedRating,
            interestValue: this.props.interestSavedRating
        };
    }

    onDiffStarClick(nextValue, prevValue, name) {
        //const diffMessages = ["Very Easy", "Easy", "Average", "Hard", "Very Hard"];
        this.setState({diffMessage: diffMessages[nextValue - 1], diffValue: nextValue});
    }
    onWorkStarClick(nextValue, prevValue, name) {
        // const workMessages = ["No work at all!", "A few hours of work a month.", "A few hours of work a week.", "A few hours of work a day.", "Nonstop work."];
        this.setState({workMessage: workMessages[nextValue - 1], workValue: nextValue});
    }

    onInterestStarClick(nextValue, prevValue, name) {
        // const intersetMessages = ["Least interesting class of my life.", "Lost interest after the first week.", "Interesting enough to attend class.", "Pretty cool stuff.", "Most interesting class I have ever taken."];
        this.setState({interestMessage: interestMessages[nextValue - 1], interestValue: nextValue});
    }


    render() {

        const grades = ["A", "B", "C", "D", "E"];
        const gradeOptions = [];
        const savedGrade = this.props.savedGrade;
        grades.forEach(function (grade) {
            if (grade == savedGrade) {
                gradeOptions.push(<option selected="selected">{grade}</option>);
            } else {
                gradeOptions.push(<option>{grade}</option>);
            }
        });



        return (
            <div>
                <div className="col-md-3 well text-left">
                    <h5>{this.props.courseName} {this.props.professorName != "" ? "with " + this.props.professorName : ""}</h5>
                    <h5>Grade Received</h5>
                    <select name={this.props.selectName} className="form-control" selected="">
                        <option> -- None -- </option>
                        {gradeOptions}
                    </select>

                    <div>
                        <h5 style={{display:"inline-block"}}>Difficulty Rating</h5>
                        <h6 style={{display:"inline-block", paddingLeft: "10px"}}><em>{this.state.diffMessage}</em></h6>
                    </div>
                    <StarRatingComponent
                        name={this.props.diffRatingName}
                        editing={true}
                        renderStarIcon={() => <span style={{fontSize: "20px"}}className="glyphicon glyphicon-education"></span>}
                        starCount={5}
                        onStarClick={this.onDiffStarClick.bind(this)}
                        value={this.state.diffValue}
                    />
                    <div>
                        <h5 style={{display:"inline-block"}}>Workload Rating</h5>
                        <h6 style={{display:"inline-block", paddingLeft: "10px"}}><em>{this.state.workMessage}</em></h6>
                    </div>
                    <StarRatingComponent
                        name={this.props.workRatingName}
                        editing={true}
                        renderStarIcon={() => <span style={{fontSize: "20px"}}className="glyphicon glyphicon-education"></span>}
                        starCount={5}
                        onStarClick={this.onWorkStarClick.bind(this)}
                        value={this.state.workValue}
                    />
                    <div>
                        <h5 style={{display:"inline-block"}}>Interest Rating</h5>
                        <h6 style={{display:"inline-block", paddingLeft: "10px"}}><em>{this.state.interestMessage}</em></h6>
                    </div>
                    <StarRatingComponent
                        name={this.props.interestRatingName}
                        editing={true}
                        renderStarIcon={() => <span style={{fontSize: "20px"}}className="glyphicon glyphicon-education"></span>}
                        starCount={5}
                        onStarClick={this.onInterestStarClick.bind(this)}
                        value={this.state.interestValue}
                    />
                    <h5>Comments</h5>
                    <textarea className="form-control" rows="3" cols="10" name={this.props.commentName}>{this.props.savedText != "none" ? this.props.savedText : ""}</textarea>
                </div>
            </div>
        );
    }
}


class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        var courseList = [];
        var count = 0;
        semesterInfo.courses.forEach(function (semester) {
            count++;
            courseList.push(<Course courseName={semester.name} professorName={semester.professor}
                                    savedText={semester.comments} savedGrade={semester.theirgrade}
                                    diffSavedRating={semester.Difficulty} workSavedRating={semester.Workload} interestSavedRating={semester.Interest}
                                    diffRatingName={"diffRating" + count}
                                    workRatingName={"workRating" + count} 
                                    interestRatingName={"interestRating" + count}
                                    commentName={"comment" + count}
                                    selectName={"grade" + count}
            />)
        });
        const ourRating = semesterInfo.ourrating;
        const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const ratingOptions = [];
        const savedRating = semesterInfo.theirrating;
        ratings.forEach(function (rating) {
            if (rating == savedRating) {
                ratingOptions.push(<option selected="selected">{rating}</option>);
            } else {
                ratingOptions.push(<option>{rating}</option>);
            }
        });

        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        {courseList}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 col-md-offset-1">
                        <h3>This semester received a difficulty score of {ourRating}. After taking it, what would you score it as?</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-1">
                        <select name="userRating" className="form-control">
                            <option> -- None -- </option>
                            {ratingOptions}
                        </select>
                        <br></br>
                        <button type="submit" className="btn btn-default btn-lg">Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Grid />,
    document.getElementById('root')
);