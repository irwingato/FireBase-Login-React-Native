import React from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Image } from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    this.fetchPhotosData();
  }

  fetchPhotosData = async () => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ photos: data });
      })
  }

  render() {
    return (
      <div>
        {this.state.photos.length > 0 && (
          <ul>
            {this.state.photos.map(photo => (
              <li key={photo.albumId}>{photo.id}<br/>{photo.title}
              <br/>
              <View style={{flex: 1, flexDirection:'row'}}>                            
                <Image
                  source={{
                      uri: photo.url,                  
                  }}
                  style={{flex: 0.5, width: 40, height: 40, alignself: 'stretch' }}/>
                  <Image
                    source={{
                      uri: photo.thumbnailUrl,                  
                    }}
                    style={{flex: 0.5, width: 40, height: 40, alignself: 'stretch'  }}/>                  
                </View>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Home;
