import mongooseService from '@/core/services/mongoose.service'
import shortid from 'shortid'
import debug from 'debug'
import { CreateUser } from '@/users/types/create-user'
import { PatchUser } from '@/users/types/patch-user'
import { PutUser } from '@/users/types/put-user'
import { PermissionFlag } from '@/core/middlewares/permissionflag-enum'

const log: debug.IDebugger = debug('app:users-dao')

class UsersModel {
    Schema = mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: { type: String, select: false },
        firstName: String,
        lastName: String,
        permissionFlags: Number,
    }, { id: false });

    User = mongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        log('Created new instance of UsersDao')
    }

    async add(userFields: CreateUser) {
        const userId = shortid.generate()
        const user = new this.User({
            _id: userId,
            ...userFields,
            permissionFlags: PermissionFlag.FREE_PERMISSION,
        })
        await user.save()
        return userId
    }

    async getByEmail(email: string) {
        return this.User.findOne({ email: email }).exec()
    }

    async getByEmailWithPassword(email: string) {
        return this.User.findOne({ email: email })
            .select('_id email permissionFlags +password')
            .exec()
    }

    async removeById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec()
    }

    async getById(userId: string) {
        return this.User.findOne({ _id: userId }).populate('User').exec()
    }

    async getAll(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
    }

    async updateById(
        userId: string,
        userFields: PatchUser | PutUser
    ) {
        const existingUser = await this.User.findOneAndUpdate(
            { _id: userId },
            { $set: userFields },
            { new: true }
        ).exec()

        return existingUser
    }
}

export default new UsersModel()
