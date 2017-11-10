import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';

class PostList extends Component {
    state = {
        isLoading: false,
        isRefreshing: false,
        posts: [],
        lastPostId: '',
        page: 1,
        error: null
    };

    componentDidMount() {
        this.fetchPosts();
    }


    fetchPosts = () => {
        const page = this.state.page;
        const url = 'https://www.reddit.com/r/aww/top/.json?raw_json=1&count=25' + (page !== 1 ? this.state.lastPostId : '');
        this.setState({ isLoading: true });

        axios.get(url)
            .then(response => this.setState({
                isLoading: false,
                isRefreshing: false,
                posts: page ===1 ? response.data.data.children : [...this.state.posts, ...response.data.data.children],
                lastPostId: response.data.data.after }))
            .catch((error) => {
                console.log(error);
            });
    };

    fetchMorePosts = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.fetchPosts();
        });
    };

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
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
                <List style={styles}>
                    <FlatList
                        data={this.state.posts}
                        renderItem={
                            ({ item }) => <ListItem title={item.data.title} avatar={{ uri: item.data.thumbnail }} />}
                        keyExtractor={(item, index) => index}
                        onEndReached={this.fetchMorePosts}
                        onEndThreshold={0.5}
                    />
                </List>
        );
    }
}

const styles = {
    marginTop: 0
};


export default PostList;
