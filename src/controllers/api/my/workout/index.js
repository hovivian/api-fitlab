import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyWorkoutIndex = async (req, res) => {
  try {
    const { session: { user: { id } } } = req
    const foundWorkout = await prisma.workout.findMany({
      where: { userId: id },
      include: {
        exercise: true
      }
    })
    return res.status(200).json(foundWorkout)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyWorkoutIndex
