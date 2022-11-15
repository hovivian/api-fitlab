import _ from 'lodash'
import yup from 'yup'
import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyProfileUpdate = async (req, res) => {
  try {
    const { session: { user: { id } } } = req

    const foundUser = await prisma.user.findUnique({ where: { id: Number(id) }, rejectOnNotFound: true })
    return res.status(200).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyProfileUpdate
