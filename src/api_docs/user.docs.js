
const adminlogin = {
    tags: ['authentication'],
    description: "sign up user",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            example: "adminexample@gmail.com"
                        },
                        password: {
                            type: "string",
                            "description": "password must be atleast 8 characters",
                            example: "123456789"
                        }
                    }
                }
            }
        }
    },

    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number',
                            example: 200,
                        },
                        data: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "String",
                                    example: "successfully logged in"
                                },
                                token: {
                                    type: "String",
                                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluZXhhbXBsZUBnbWFpbC5jb20iLCJpYXQiOjE2ODA3MDU2MjEsImV4cCI6MTY4MDcwOTIyMX0.eoOr9wEZkg1KueBwHgmyX8gr5Wl9j2BoUbwZOOcvj-E"
                                }
                            }
                        }
                    }
                }
            }
        },
        201: {
            description: "OK",
            content: {
                "application/json": {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'number',
                            example: 200,
                        },
                        data: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "String",
                                    example: "password not matching"
                                }

                            }
                        }
                    }
                }
            }
        }
    }
}

const userRouteDocs = {
    "/villageAPI/auth/adminlogin": {
        post: adminlogin
    }
}

export default userRouteDocs;