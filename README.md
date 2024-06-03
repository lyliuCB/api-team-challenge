## Prequisition

```bash
Node Version V20
Postgres
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## API GuideLine

```bash
# schedule
POST /schedule  create a schedule

e.g. request.body
{
    "account_id":22,
    "agent_id":22222233,
    "start_time":"2024-06-07T01:00:00.000Z",
    "end_time":"2024-06-07T03:00:00.000Z"
}

Returned response

{
    "code": 200,
    "data": {
        "account_id": 223,
        "agent_id": 22222233,
        "start_time": "2024-06-07T01:00:00.000Z",
        "end_time": "2024-06-07T03:00:00.000Z",
        "id": "11501e04-d8a4-4280-9e37-35324a782146"
    },
    "message": "success"
}

GET /schedule?account_id=223 Get a list of schedules, with filters of account_id and agent_id

{
    "code": 200,
    "data": [
        {
            "id": "ac572576-3353-4fa9-a4b5-448d964e97d0",
            "account_id": 223,
            "agent_id": 22222233,
            "start_time": "2024-06-07T01:00:00.000Z",
            "end_time": "2024-06-07T03:00:00.000Z"
        },
        {
            "id": "3d6bab79-80e1-4a92-9928-919ad5b86128",
            "account_id": 223,
            "agent_id": 22222233,
            "start_time": "2024-06-07T01:00:00.000Z",
            "end_time": "2024-06-07T03:00:00.000Z"
        },
        {
            "id": "8bfc763f-7a25-455c-bff0-ba4b5df0766f",
            "account_id": 223,
            "agent_id": 22222233,
            "start_time": "2024-06-07T01:00:00.000Z",
            "end_time": "2024-06-07T03:00:00.000Z"
        }
    ],
    "message": "success"
}

GET /schedule/ac572576-3353-4fa9-a4b5-448d964e97d0  Get a schedule 

{
    "code": 200,
    "data": {
        "id": "ac572576-3353-4fa9-a4b5-448d964e97d0",
        "account_id": 223,
        "agent_id": 22222233,
        "start_time": "2024-06-07T01:00:00.000Z",
        "end_time": "2024-06-07T03:00:00.000Z"
    },
    "message": "success"
}


PUT /schedule/ac572576-3353-4fa9-a4b5-448d964e97d0 Update a schedule

request.body 
{
    "account_id":223,
    "agent_id":22222233,
    "start_time":"2024-06-07T01:00:00.000Z",
    "end_time":"2024-06-07T03:00:00.000Z"
} 

response
{
    "code": 200,
    "data": {
        "id": "ac572576-3353-4fa9-a4b5-448d964e97d0",
        "account_id": 223,
        "agent_id": 22222233,
        "start_time": "2024-06-07T01:00:00.000Z",
        "end_time": "2024-06-07T03:00:00.000Z"
    },
    "message": "success"
}

DELETE /schedule/ac572576-3353-4fa9-a4b5-448d964e97d0

{
    "code": 200,
    "data": {
        "message": "Schedule ac572576-3353-4fa9-a4b5-448d964e97d0 deleted"
    },
    "message": "success"
}

# task 

{
    "code": 200,
    "data": [
        {
            "id": "63872dfe-760c-40e3-a725-dfb5bcebd017",
            "account_id": 227,
            "schedule_id": "8bfc763f-7a25-455c-bff0-ba4b5df0766f",
            "start_time": "2024-06-07T01:00:00.000Z",
            "duration": 300,
            "type": "break"
        }
    ],
    "message": "success"
}


```
