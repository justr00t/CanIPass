import React from 'react';
import ReactDOM from 'react-dom';
import AnalysisRoot from '../components/analysis-root';


/*var rating = !{rating};
 var courses = !{semesterInfo};
 var reasons = !{reasons};
 var fields = !{fields};
 var correspFields = !{correspFields};*/

var infos = {
  loggedIn: loggedIn,
  rating: rating,
  reasons: reasons,
  courses: courses,
  fields: fields,
  correspFields: correspFields,
  fieldDescriptions: fieldDescriptions
};

ReactDOM.render(<AnalysisRoot {...infos} />, document.getElementById('analysis-root'));
