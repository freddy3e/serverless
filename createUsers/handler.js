const aws = require("aws-sdk")
const randomUUID = require('crypto').randomUUID

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'AKIAXVY34YEDMERQWZNS',  // needed if you don't have aws credentials at all in env
        secretAccessKey: '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' // needed if you don't have aws credentials at all in env
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const createUsers = async (event, context) => {

    const id = randomUUID()
    const user = {
        pk: id,
        ...JSON.parse(event.body)
    }
    var params = {
        TableName: 'usersTable',
        Item: user
    };
    console.log(params.Item)

    return dynamodb.put(params).promise().then(res => {
        console.log(res)
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user created': user })
        }
    })
}

module.exports = {
    createUsers
}
