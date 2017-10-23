import React, {Component} from 'react';
import Map from './Map';


class DetailApp extends Component {
     constructor(props){
       super(props);
       this.state = {
         id: 0,
         title: '',
         max_elevation: 0,
         distance: 0,
         points: []
       };
     }

     render() {
       return (
         <div>
           <Map points={this.state.points}/>
         </div>
       );
     }

     componentWillMount() {
      const that = this;
      $.get( "/api/track/13/", function( data ) {
        let points = [];
        data.points.map(item =>{
          points.push([item[0], item[1]]);
        });
        that.setState({points: points});
      });
     }
   }

   export default DetailApp;