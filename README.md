# BondWork

## Project of a B2B React Web/App for Companies who wants to reduce their turnover rate and improve work culture using MERN Stack
BondWork provides the tools and insights necessary for companies to create a supportive and engaging work environment, addressing key factors that influence employee retention. By focusing on People and Work Culture, BondWork helps organizations reduce turnover rate, retain valuable talent, and build a strong, motivated workforce.

## Design
BondWork is designed to be user-friendly, intuitive, and visually appealing. 
The design follows progressive web app principles for a seamless user experience.

**Logo:**: 
Our logo combines the initial letters of our company, the "b" and "w", using geometric shapes to maintain a minimalist design. We applied a shape builder technique to merge the letters, complemented by a gradient color effect to make the curves stand out.
![Representation of Geometric shapes B and W forming the Logo](https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/Logo_explanation.png)

**Typography:**
For typography we choose IBM Plex, a sans-serif font. Modern, clean, highly legible. Designed for readability across digital and print media.

**Color:** 
Salmon as our primary color, a “orangesh” energetic color that brings a feeling optimistic and uplifting, and blue brings a trustworthy feeling. 
Green, Yellow and Red to indicate different alert levels.
Black and gray for text and background.

**Iconography:**
For our iconography, we opt for lined icons to maintain a clean and minimalist layout. To add an exclusive touch, we have integrated a small dot that enhances the charm and lightness of the design.

**Components:**
In terms of components, we applied rounded corners to all of them to visually softens elements, promoting a modern and accessible aesthetic, enhancing usability even on mobile devices. 
Our primary design challenge revolved around tables, which are abundant in our platform. To enhance usability, we adopted a lightweight approach integrating badges and micro-interactions. This facilitates easier comprehension of information and available actions. 

**Check it out the Prototype:** [FIGMA PROTOTYPE](https://www.figma.com/proto/cAsEuSDfBefNZoPIUMDbWN/Mockup?page-id=2502%3A250687&node-id=2502-258904&starting-point-node-id=2502%3A258904)

**Screens**

<table>  
    <th>LandingPage Desktop</th>
    <th>LandingPage Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/LandingPageDesktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/LandingPageMobile.png" width=270/>
        </td>
    </tr>
</table>

<table>  
    <th>Login Desktop</th>
    <th>Login Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/LoginDesktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/LoginMobile.png" width=750/>
        </td>
    </tr>
</table>

<table>  
    <th>SignUp Desktop</th>
    <th>SignUp Mobile</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/SignupDesktop.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/SignupMobile.png" width=500/>
        </td>
    </tr>
</table>

<table>  
    <th>Dashboard Page</th>
    <th>Recognitions Page</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/Dashboard.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/RecognitionsPage.png"/>
        </td>
    </tr>
</table>

<table>  
    <th>Rewards Page</th>
    <th>Surveys Page</th>
    <tr>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/RewardsPage.png"/>
        </td>
        <td>
            <img src="https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/screenshots/SurveyPage.png"/>
        </td>
    </tr>
</table>

## How to run the project

1. Create an account on the [MongoDB](https://www.mongodb.com/).
2. Create a `.env` file inside the backend folder based on `.env.example.backend` in the same folder, and another `.env` file inside the frontend folder based on `.env.example.frontend` in the same folder and fill the variables accordingly to your environment.
3. Inside the folder `backend/src/resources`, there are mock json files that you can use those files to create the collections in MongoDB more quickly
4. Install the dependencies of the project. Open the terminal, and inside the root folder of the project run the command:

```sh
npm run setup
```

5. Then execute the command line to start the program:

```sh
npm run start
```

That's it! You're ready to explore BondWork platform.

Ps.: You can use this endpoint to create the user to login, just make sure to fix `localhost:5000` to your backend url:

```
curl --location 'localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppZ2dseXB1ZmYud21kZEBnbWFpbC5jb20iLCJfaWQiOiI2NmE5NGVlOTBhY2YzMjVmOTI1ODI3NDQiLCJpYXQiOjE3MjI0NzAyMDQsImV4cCI6MTcyMjQ5OTAwNH0.Zwv0jtl-RxVIvPywFeeQ3gNUojUk7Kt5YlYLcFJ3pRk' \
--data-raw '{
    "employeeID": 123456789,
    "email": "jigglypuff.wmdd@gmail.com",
    "password": "test12345",
    "firstName": "User",
    "lastName": "Tester",
    "profilePicture": "",
    "department": {
        "name": "QA",
        "id": 99
    },
    "jobLevel": "Mid Level",
    "jobTitle": "QA",
    "onBoardingDate": "2023-09-01",
    "lastAccess": "2024-07-02",
    "surveys": [],
    "rewards": [],
    "recognitions": {
        "sent": [],
        "received": []
    },
    "points": 5000,
    "adminRights": true
}'
```

## Base Project / Tech Stack

-   **IDE**: [VSCode - Visual Studio Code](https://code.visualstudio.com/)
-   **Frontend Framework**: [React](https://react.dev/), [TailwindCSS](https://tailwindcss.com/), [MaterialUI](https://mui.com/material-ui/)
-   **Backend Framework**: [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **Authentication**: [JWT](https://jwt.io/)


## Database

- [Dictionary/Glossary](https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/backend/docs/database_glossary.md)
- [EDR Diagram](https://github.com/rafaelmfer/Bondwork-app/blob/task/update_readme/backend/docs/DatabaseStructure.png)