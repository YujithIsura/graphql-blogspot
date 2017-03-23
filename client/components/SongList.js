import React,{Component } from 'react';
import query from '../querries/fetchSongs';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router';

class SongList extends Component{
  renderSongs(){
    return (this.props.data.loading)?
    (<div>loading...</div>)
    :this.props.data.songs.map(({id, title})=> (
        <li className="collection-item"  key={id} >
          {title}
          <i className="material-icons"
            onClick={()=> this.onClick(id)}>delete</i>
        </li>
      )
    );
  }

  onClick(id){
    event.preventDefault();
    console.log(this.props);
    this.props.mutate({
      variables: {
        id: id,
        refetchQueries: [{ query }]
      }
    });
  }

  render(){
    return (
      <div>
        <h1>Welcome to Tommorowland!</h1>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}


const mutation = gql`
    mutation DeleteSong($id: String) {
      delete(id: $id){
        title
      }
    }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
