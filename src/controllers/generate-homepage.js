import React from 'react';
import ReactDOM from 'react-dom';



const majors = [];
var courses = [];
var professors = [];
var selectedValues = {1: {course: "", professor:"Professor Not Listed"}, 2: {course: "", professor:"Professor Not Listed"}, 3: {course: "", professor:"Professor Not Listed"},
    4: {course: "", professor:"Professor Not Listed"}, 5: {course: "", professor:"Professor Not Listed"}, 6: {course: "", professor:"Professor Not Listed"}};

function getMajors() {
    window.courseInfo.forEach(function (item) {
        if (majors.indexOf(item.major) == -1) {
            majors.push(item.major);
        }
    });
    majors.sort();
}


function getCourses(major) {
    courses = [];
    courseInfo.forEach(function (item) {
        if (courses.indexOf(item.course) == -1 && item.major == major) {
            courses.push(item.course);
        }
    });
    courses.sort();
}

function getProfessors(course) {
    professors = [];
    courseInfo.forEach(function (item) {
        if (professors.indexOf(item.professor) == -1 && item.course == course) {
            professors.push(item.professor);
        }
    });
    professors.sort();
}

function generateRating() {
    var queryInfo = [];
    for (var i = 1; i < 7; i++) {
        var currentCourse = selectedValues[i].course;
        if (currentCourse != "-- None --" && currentCourse != "") {
            queryInfo.push(selectedValues[i]);
        }
    }
    if(!(queryInfo.length === 0)) {
        var search = "/generateRating?courses=" + JSON.stringify(queryInfo);
        window.location.href = search;
    }
}

window.generateRating = generateRating;



class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majorOptions: majors.map((major, index) => <option key={index}>{major}</option>),
            selectedMajor: null,
            courseOptions: null,
            selectedCourse: null,
            professorOptions: null,
            selectedProfessor: null
        };
        this.handleChangeMajor = this.handleChangeMajor.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleChangeProfessor = this.handleChangeProfessor.bind(this);
    }

    handleChangeMajor(event) {
        getCourses(event.target.value);
        this.setState({
            selectedMajor: event.target.value,
            courseOptions: courses.map((course, index) => <option key={index}>{course}</option>)
        });
    }

    handleChangeCourse(event) {
        getProfessors(event.target.value);
        selectedValues[this.props.courseNumber].course = event.target.value;
        this.setState({
            selectedCourse: event.target.value,
            professorOptions: professors.map((professor, index) => <option key={index}>{professor}</option>)
        });
    }

    handleChangeProfessor(event) {
        selectedValues[this.props.courseNumber].professor = event.target.value;
        this.setState({
            selectedProfessor: event.target.value
        });
    }

    render() {
        let add = <div></div>;
        if (this.props.hidden && !this.props.addHidden) {
            add = <AddCourse onClick={() => this.props.onClick()}/>;
        }
        return (
            <div>
                <div className="col-md-4" style={{display: this.props.hidden ? "none" : "block"}}>
                    <h4>Course {this.props.courseNumber}</h4>
                    <div className="well text-center">
                        <h5>Major</h5>
                        <select onChange={this.handleChangeMajor} className="form-control">
                            <option> -- None -- </option>
                            {this.state.majorOptions}</select>
                        <h5>Course</h5>
                        <select onChange={this.handleChangeCourse} className="form-control">
                            <option> -- None -- </option>
                            {this.state.courseOptions}</select>
                        <h5>Professor</h5>
                        <select onChange={this.handleChangeProfessor} className="form-control">
                            <option> Professor Not Listed </option>
                            {this.state.professorOptions}</select>
                    </div>
                </div>
                {add}
            </div>
        );
    }
}

class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h4>Add Course</h4>
                <div className="col-md-4 text-center well">
                    <a onClick={this.props.onClick}>
                        <span className="glyphicon glyphicon-plus" style={{fontSize: "100px", paddingTop: "60px", paddingBottom: "75px"}}></span>
                    </a>
                </div>
            </div>
        );
    }
}

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden1: false,
            hidden2: true,
            hidden3: true,
            hidden4: true,
            hidden5: true,
            hidden6: true,
            addHidden1: true,
            addHidden2: false,
            addHidden3: true,
            addHidden4: true,
            addHidden5: true,
            addHidden6: true
        };
        this.handleClick = this.handleClick.bind(this);
        getMajors();
    }
    handleClick(courseNum) {
        if (courseNum === 2) {
            this.setState({
                hidden2: false,
                addHidden2: true,
                addHidden3: false
            });
        }
        if (courseNum === 3) {
            this.setState({
                hidden3: false,
                addHidden3: true,
                addHidden4: false
            });
        }
        if (courseNum === 4) {
            this.setState({
                hidden4: false,
                addHidden4: true,
                addHidden5: false
            });
        }
        if (courseNum === 5) {
            this.setState({
                hidden5: false,
                addHidden5: true,
                addHidden6: false
            });
        }
        if (courseNum === 6) {
            this.setState({
                hidden6: false,
                addHidden6: true
            });
        }
    }


    render() {
        var course6 = <Course courseNumber="6" courses={courses} onClick={() => this.handleClick(6)} hidden={this.state.hidden6} addHidden={this.state.addHidden6}/>;
        var course5 = <Course courseNumber="5" courses={courses} onClick={() => this.handleClick(5)} hidden={this.state.hidden5} addHidden={this.state.addHidden5}/>;
        var course4 = <Course courseNumber="4" courses={courses} onClick={() => this.handleClick(4)} hidden={this.state.hidden4} addHidden={this.state.addHidden4}/>;
        var course3 = <Course courseNumber="3" courses={courses} onClick={() => this.handleClick(3)} hidden={this.state.hidden3} addHidden={this.state.addHidden3}/>;
        var course2 = <Course courseNumber="2" courses={courses} onClick={() => this.handleClick(2)} hidden={this.state.hidden2} addHidden={this.state.addHidden2}/>;
        var course1 = <Course courseNumber="1" courses={courses} onClick={() => this.handleClick(1)} hidden={this.state.hidden1} addHidden={this.state.addHidden1}/>;


        return (
            <div>
                <hr></hr>
                <div className="col-md-10 col-md-offset-1">
                    {course1}
                    {course2}
                    {course3}
                </div>
                <div className="col-md-10 col-md-offset-1">
                    {course4}
                    {course5}
                    {course6}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Grid />,
    document.getElementById('root')
);