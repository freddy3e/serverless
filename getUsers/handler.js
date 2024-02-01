const aws = require("aws-sdk")

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

const getUsers = async (event, context) => {

    let userId = event.pathParameters.id

    var params = {
        ExpressionAttributeValues: { ':pk': userId },
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
    };

    return dynamodb.query(params).promise().then(res => {
        console.log(res)
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user': res.Items[0] })
        }
    })
}

module.exports = {
    getUsers
}
