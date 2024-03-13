const user = (data) => {
    return {
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        img_profile: data.img_profile,
        role: data.role,
        is_active: data.is_active,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
}

module.exports = {
    userResource: (data) => user(data),
}