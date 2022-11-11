import axios from 'axios'
import cookies from 'react-cookies'

export const endpoints = {
    "posts": "/posts/",
    "login": "/o/token/",
    "comments": "/comments/",
    "register": "/users/",
    "user-detail":(userId) => `/users/${userId}/`,
    "post-detail": (postId) => `/posts/${postId}/`,
    "post-delete": (postId) => `/posts/${postId}/`,
    "post-comments": (postId) => `/posts/${postId}/comments/`,
    "post-add-comment": (postId) => `/posts/${postId}/add-comment/`,
    "current-user": "/users/current-user/",
    "like":  (postId) => `/posts/${postId}/like/`,
    "report":  (postId) => `/posts/${postId}/report/`,
    "add-post": "/posts/add-post/",
    "update-post": (postId) => `/posts/${postId}/update-post/`,
    "comment-notification": (userId) => `/users/${userId}/send-notification/`,
    "get-notification": (userId) => `/users/${userId}/get-notification/`,
    "tags": "/tags/",
    "get-auction-info": (postId) => `/posts/${postId}/get-auction-info/`,
    "send-auction-winner": (userId) => `/users/${userId}/send-auction-winner/`,
    "get-auction-winner": (userId) => `/users/${userId}/get-auction-winner/`,
    "send-auction-loser": (userId) => `/users/${userId}/add-auction-loser/`,
    "get-auction-loser": (userId) => `/users/${userId}/get-auction-loser/`,
    "add-auction":(postId) => `/posts/${postId}/add-auction/`,
    "send-like-notification": (userId) => `/users/${userId}/send-like-notification/`,
    "get-like-notification": (userId) => `/users/${userId}/get-like-notification/`,
    "stats": "/posts/stats/",
    "stats-detail": (postId) => `/posts/${postId}/detail-stats/`,
    "user-stats": (userId) => `/users/${userId}/user-stats/`,
}

export const authApi = () => {
    return axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
        }
    })
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})