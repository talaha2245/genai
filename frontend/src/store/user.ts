import { atom } from "jotai";

export const mainuserdata = atom({
    username: "Talaha",
    image: "/Users/talahanuman/Desktop/gen-ai/frontend/public/images/warren-VVEwJJRRHgk-unsplash.jpg"
})

export const CurrentLoggedinUser = atom({

})

export const baseUrl = atom("http://localhost:3001/api/v1")

export const Someusers = atom([{
    username: "Aarav",
    image: "frontend/public/images/user1.jpg"
},
{
    username: "Ishaan",
    image: "frontend/public/images/user2.jpg"
},
{
    username: "Riya",
    image: "frontend/public/images/user3.jpg"
},
{
    username: "Kabir",
    image: "frontend/public/images/user4.jpg"
},
{
    username: "Mira",
    image: "frontend/public/images/user5.jpg"
},
{
    username: "Zoya",
    image: "frontend/public/images/user6.jpg"
},
{
    username: "Advait",
    image: "frontend/public/images/user7.jpg"
},
{
    username: "Sahana",
    image: "frontend/public/images/user8.jpg"
},
{
    username: "Rehan",
    image: "frontend/public/images/user9.jpg"
},
{
    username: "Myra",
    image: "frontend/public/images/user10.jpg"
}]
)