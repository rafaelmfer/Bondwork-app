# Database Glossary

## 1. Users

**Description:** Collection that stores information about users (employees).

| Field          | Type    | Description                                 |
| -------------- | ------- | ------------------------------------------- |
| email          | String  | User's email address.                       |
| hashPassword   | String  | User's hashed password.                     |
| employeeID     | Number  | Employee ID.                                |
| firstName      | String  | User's first name.                          |
| lastName       | String  | User's last name.                           |
| department     | Object  | User's department (id and name).            |
| onBoardingDate | Date    | User's onboarding date.                     |
| jobTitle       | String  | User's job title.                           |
| profilePicture | String  | URL of the user's profile picture.          |
| adminRights    | Boolean | Indicates if the user has admin rights.     |
| surveys        | Array   | Surveys assigned to the user.               |
| recognitions   | Object  | Recognitions sent and received by the user. |
| points         | Number  | Points accumulated by the user.             |
| lastAccess     | Date    | Date of the user's last access.             |
| workSchedule   | String  | User's work schedule.                       |
| rewards        | Array   | Rewards requested by the user.              |

## 2. Surveys

**Description:** Collection that stores information about surveys.

| Field         | Type    | Description                                            |
| ------------- | ------- | ------------------------------------------------------ |
| surveyId      | Number  | Survey ID.                                             |
| name          | String  | Survey name.                                           |
| description   | String  | Survey description.                                    |
| jobLevel      | Array   | Job levels targeted by the survey.                     |
| startDate     | Date    | Survey start date.                                     |
| endDate       | Date    | Survey end date.                                       |
| status        | String  | Survey status (Ongoing, Completed, etc.).              |
| recurrence    | String  | Survey recurrence (Monthly, Annual, etc.).             |
| points        | Number  | Points awarded for completing the survey.              |
| departments   | Array   | Departments targeted by the survey.                    |
| departmentsId | Array   | Departments Ids targeted by the survey.                |
| completed     | Array   | List of employee IDs who have completed the survey.    |
| sent          | Array   | List of employee IDs to whom the survey has been sent. |
| questions     | Array   | Survey questions.                                      |
| publish       | Boolean | Indicates if the survey is published.                  |

## 3. Rewards

**Description:** Collection that stores information about rewards.

| Field      | Type    | Description                                              |
| ---------- | ------- | -------------------------------------------------------- |
| rewardId   | Number  | Reward ID.                                               |
| category   | String  | Reward category.                                         |
| details    | String  | Reward details.                                          |
| pointsCost | Number  | Cost in points of the reward.                            |
| status     | String  | Reward status (Ongoing, Expired, etc.).                  |
| startDate  | Date    | Reward start date.                                       |
| endDate    | Date    | Reward end date.                                         |
| redeem     | Array   | List of objects with employee IDs and redemption status. |
| title      | String  | Reward title.                                            |
| image      | String  | URL of the reward image.                                 |
| publish    | Boolean | Indicates if the reward is published.                    |

## 4. Recognitions

**Description:** Collection that stores information about feedback between employees.

| Field         | Type   | Description                                             |
| ------------- | ------ | ------------------------------------------------------- |
| recognitionId | Number | Recognition ID.                                         |
| sender        | Number | ID of the employee sending the recognition.             |
| receiver      | Number | ID of the employee receiving the recognition.           |
| dateRequest   | Date   | Date the recognition was requested.                     |
| date          | Date   | Date of approval/rejection of the recognition.          |
| status        | String | Recognition status (Approved, Rejected, Pending).       |
| category      | String | Recognition category.                                   |
| details       | String | Recognition details.                                    |
| points        | Number | Points awarded for the recognition.                     |
| reason        | String | Reason for the recognition's rejection (if applicable). |
| rejectDetails | String | Details of the rejection (if applicable).               |

## 5. Departments

**Description:** Collection that stores information about departments.

| Field          | Type   | Description                             |
| -------------- | ------ | --------------------------------------- |
| departmentId   | Number | Department ID.                          |
| departmentName | String | Department name.                        |
| employees      | Array  | List of employee IDs in the department. |

## Additional Information

1. **Relationships Between Collections:**

    - Describe how collections relate to each other. For example, `employeeID` in the `Users` collection can correspond to `employees` in the `Departments` collection.

2. **Indexes:**

    - Specify any indexes created on the collections to improve query efficiency. For example, indexes on `email` and `employeeID` in `Users` for fast lookups.

3. **Validations:**

    - Describe any additional validation applied to the fields beyond what is defined in the Mongoose schema.

4. **Data Examples:**

    - Include examples of documents for each collection to provide a clear reference of the expected data structure.

5. **Security Considerations:**

    - Indicate any security measures implemented, such as password hashing and access control to collections.

6. **Integration Points:**
    - Describe how these collections interact with other parts of the system, such as API endpoints and business logic.

---
