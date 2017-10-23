import React, { Component } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';

class PostList extends Component {
    state = { isLoading: true, posts: [] };

    componentWillMount() {
        axios.get('https://www.reddit.com/r/aww/top/.json?raw_json=1').then(response => this.setState({ isLoading: false, posts: response.data.data.children }));
        // axios.get('https://www.reddit.com/r/aww/top/.json?raw_json=1').then(response => console.log(response.data.data.children));
    }

    renderRow(rowData) {
        return (
            <ListItem
                title={rowData.data.title}
                avatar={{ uri: rowData.data.thumbnail }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            //<ScrollView>
                <List style={styles}>
                    <FlatList
                        data={this.state.posts}
                        renderItem={
                            ({ item }) => <ListItem title={item.data.title} avatar={{ uri: item.data.thumbnail }} />}
                        keyExtractor={(item, index) => index}
                    />
                </List>
                    // {
                    //     this.state.posts.map((post, i) => (
                    //         <ListItem
                    //             key={i}
                    //             title={post.data.title}
                    //             avatar={{ uri: post.data.thumbnail }}
                    //         />
                    //     ))
                    // }
                //</List>
            //</ScrollView>
        );
    }
}

const styles = {
    marginTop: 0
};


export default PostList;
