'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
	Image,
	Dimensions,
	RefreshControl
} from 'react-native';

class Resources extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            serverError: false,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
			searchQuery: '',
			refreshing: false
        };
    }
	
	componentDidMount() {
		appConfig.goods.showProgress = true;
		this.setState({
            width: Dimensions.get('window').width
        });
        this.getItems();
	}
	
    componentWillUpdate() {
        if (appConfig.goods.refresh) {
            appConfig.goods.refresh = false;

            this.setState({
                showProgress: true,
				resultsCount: 0
            });

            this.getItems();
        }
    }

    getItems() {
		this.setState({
			serverError: false,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
			searchQuery: ''
        });
		
        fetch(appConfig.url + 'api/goods/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort).slice(0, 15)),
                    resultsCount: responseData.length,
                    responseData: responseData,
                    filteredItems: responseData
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    showDetails(rowData) {
		this.props.navigator.push({
			index: 21,
			data: rowData
		});
    }
	
    addItem() {
		appConfig.goods.showProgress = false;
		this.props.navigator.push({
			index: 22
		});
    }
	
    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={()=> this.showDetails(rowData)}
                underlayColor='#ddd'
            >
				<View style={{
						flex: 1,
						flexDirection: 'column',
						padding: 12,
						borderColor: '#D7D7D7',
						borderBottomWidth: 1,
						backgroundColor: '#fff'
					}}>              
						<Text style={{backgroundColor: '#fff', color: 'black', fontWeight: 'bold'}}>
							{rowData.name}
						</Text>						
						
						<Text style={{backgroundColor: '#fff', color: 'black', fontWeight: 'bold'}}>
							{appConfig.language.price}: {((+rowData.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
						</Text>
				</View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
		console.log(event.nativeEvent.contentOffset);
        if (this.state.showProgress == true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 15,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.getUsers()
            }, 300);
        }

        if (this.state.filteredItems == undefined) {
            return;
        }

        var recordsCount = this.state.recordsCount;
        var positionY = this.state.positionY;
        var items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 400
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource == undefined) {
            return;
        }

        var arr = [].concat(this.state.responseData);
        var items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
	
	refreshDataAndroid() {
		this.setState({
			showProgress: true,
			resultsCount: 0
		});

		this.getItems();
	}
	
	goBack() {
		this.props.navigator.pop();
	}
	
	clearSearchQuery() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 15)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
			positionY: 0,
			recordsCount: 15,
			searchQuery: ''
		});
	}
	
    render() {
        let errorCtrl, loader, image;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    animating={true}
                />
            </View>;
        }

		if (this.state.searchQuery.length > 0) {
			image = <Image
				source={require('../../../img/cancel.png')}
				style={{
					height: 20,
					width: 20,
					marginTop: 10
				}}
			/>;
		}

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#48BBEC'
						>
                            <View>
                                <Text style={styles.textSmall}>
									{appConfig.language.back}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textLarge}>
                                    {appConfig.language.resources}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
						<TouchableHighlight
							onPress={()=> this.addItem()}
							underlayColor='#48BBEC'
						>
                            <View>
                                <Text style={styles.textSmall}>
                                    {appConfig.language.add}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
				
                <View style={styles.iconForm}>
					<View>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={this.onChangeText.bind(this)}
							style={{
								height: 45,
								padding: 5,
								backgroundColor: 'white',
								borderWidth: 3,
								borderColor: 'white',
								borderRadius: 0,
								width: this.state.width * .90,
							}}
							value={this.state.searchQuery}
							placeholder={appConfig.language.search}>
						</TextInput>
					</View>
					<View style={{
						height: 45,
						backgroundColor: 'white',
						borderWidth: 3,
						borderColor: 'white',
						marginLeft: -10,
						paddingLeft: 5,
						width: this.state.width * .10,
					}}>			
						<TouchableWithoutFeedback
							onPress={() => this.clearSearchQuery()}
						>			
							<View>					
								{image}
							</View>
						</TouchableWithoutFeedback>
					</View>
                </View>

                {errorCtrl}

                {loader}
				
				<ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}
					refreshControl={
						<RefreshControl
							enabled={true}
							refreshing={this.state.refreshing}
							onRefresh={this.refreshDataAndroid.bind(this)}
						/>
					}
				>
					<ListView
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</ScrollView>
				
				<View>
					<Text style={styles.countFooter}>
						{appConfig.language.records} {this.state.resultsCount.toString()} 
					</Text>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
	iconForm: {
		flexDirection: 'row',
		borderColor: 'lightgray',
		borderWidth: 3
	},
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#48BBEC',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginRight: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        height: 45,
        marginTop: 0,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: '#48BBEC',
        color: 'white',
        fontWeight: 'bold'
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Resources;
