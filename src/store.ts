import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';



import {Product} from '@/types';

Vue.use(Vuex, VueAxios, axios);

const baseUrl = 'http://localhost:3000';

export default new Vuex.Store({
    state: {
      products: [],
      token: '',
    },

    getters: {
        getProductsList(state) {
           return state.products;
        },
        loggedIn(state) {
            return state.token;
        },
    },

    mutations: {
        userToken(state, token) {
            state.token = token;
        },
        accessToken(state) {
            state.token = localStorage.getItem('access-token');
        },
        updateProducts(state, data) {
            state.products = [...data];
        },
  },

    actions: {

    checkToken(context) {
            context.commit('accessToken');
        },
        getProducts(context) {
            axios({
                url: 'http://localhost:3000/graphql',
                method: 'post',
                data: {
                    query: `
                        {
                            products {
                                id
                                name
                                price
                                description
                                date
                            }
                        }
                    `,
                },
                headers: {
                    Authorization: this.state.token,
                },
            })
            // axios.get(baseUrl + '/products',
            // {
            //     headers: {
            //         Authorization: this.state.token
            //     }
            // })
            .then((response) => {
                const data = response.data.data.products;
                console.log(data);

                context.commit('updateProducts', data);
            })
            .catch((error) => {
                console.log(error);
            });
        },

        addProduct(context, product: Product) {
            const dateClient = product.date;
            console.log(typeof product.price);
            axios({
                url: 'http://localhost:3000/graphql',
                method: 'post',
                data: {
                    query: `
                        mutation addProduct(
                            $name: String!
                            $price: Int!
                            $description: String!
                            $date: String!
                        ){
                            addProduct(
                                name: $name
                                price: $price
                                description: $description
                                date: $date
                            ){
                                name
                                price
                                description
                                date
                            }
                        }`,
                        variables: {
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            date: dateClient,
                        },
                },
                headers: {
                    Authorization: this.state.token,
                },
            })
            // axios.post(baseUrl + '/products', {
            //     product: {
            //         name: product.name,
            //         price: product.price,
            //         description: product.description,
            //         date: dateClient
            //     }
            // },
            // {
            //     headers: {
            //         Authorization: this.state.token
            //     }
            // })
            .then((response) => {

                const token = response.data.data.token;
                console.log(token + ' store');

                const data = response.data.data.addProduct;
                console.log(data);

                context.commit('updateProducts', data);

                // if(token === false) {
                //     alert('неверный логин или пароль!')
                //     localStorage.setItem('access-token', token)
                //     context.commit('userToken', token)
                //     router.push('/')
                // } else {

                //     var dData = response.data.data.products
                //     console.log(dData + " store add")
                //     context.commit('updateProducts', dData)

                // }
            })
            .catch((error) => {
                console.log(error);
            });
        },

        removeProduct(context, id) {
            console.log(id);
            axios.delete(baseUrl + '/products/' + id, {
                headers: {
                    Authorization: this.state.token,
                },
            })
            .then((response) => {
                const token = response.data.token;
                console.log(token + ' store del');

                if (token === false) {
                    alert('неверный логин или пароль!');
                    localStorage.setItem('access-token', token);
                    context.commit('userToken', token);
                    router.push('/');
                } else {

                    const data = response.data;
                    console.log(data);
                    context.commit('updateProducts', data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },

        updateProductDetails(context, product) {
            axios.put(baseUrl + '/products/' + product.id, {
                params: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                },
            },
            {
                headers: {
                    Authorization: this.state.token,
                },
            })
            .then((response) => {
                console.log(response);

                const token = response.data.token;
                console.log(token + ' store put');

                if (token === false) {
                    alert('неверный логин или пароль!');
                    localStorage.setItem('access-token', token);
                    context.commit('userToken', token);
                    router.push('/');
                } else {

                    const data = response.data;
                    console.log(data);
                    context.commit('updateProducts', data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getLogin(context) {
            context.commit('accessToken');
            return axios.get(baseUrl, {
                    headers: {
                        Authorization: this.state.token,
                    },
                })
                .then((response) => {
                    console.log(response);
                    const token = response.data.token;
                    if (token === false || null) {
                    } else {
                        localStorage.setItem('access-token', token);
                        context.commit('userToken', token);
                        router.push('/products');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        userLogin(context, user) {
            return axios.post(baseUrl, {
                user,
            })
            .then((response) => {
                console.log(response);

                const token = response.data.token;
                console.log(token);

                if (token === false) {
                    alert('неверный логин или пароль!');
                    localStorage.setItem('access-token', token);

                    context.commit('userToken', token);
                } else {
                    localStorage.setItem('access-token', token);
                    context.commit('userToken', token);
                    router.push('/products');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
});
