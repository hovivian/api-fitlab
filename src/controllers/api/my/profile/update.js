import _ from 'lodash'
import yup from 'yup'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const updateSchema = yup.object({
  email: yup.string().email().required().test({
    message: () => 'Email already exists',
    test: async (value) => {
      try {
        await prisma.user.findUnique({ where: { email: value }, rejectOnNotFound: true })
        return false
      } catch (err) {
        return true
      }
    }
  }),
  username: yup.string().required().min(1, 'Minimum 6 characters').max(15, 'Maximum 15 characters'),
  height: yup.number().required(),
  targetWeight: yup.number().required()
})

const controllersApiMyProfileUpdate = async (req, res) => {
  try {
    const { body, session: { user: { id } } } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updated = await prisma.wishlist.update({ where: { id: Number(id) }, data: verifiedData })

    return res.status(200).json(updated)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyProfileUpdate
