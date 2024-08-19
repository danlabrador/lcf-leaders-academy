import { CourseOfferingModel } from "../models/schemas/courseOffering.schema";
import { NotFoundError } from "../util/errors";
import { StaffRoleModel } from "../models/schemas/staffRole.schema";
import { UserModel } from "../models/schemas/user.schema";
import { RoleEnum } from "../models/enums/RoleEnum";

export async function getUsersAuthorizedToCreateEnrollment(
  courseOfferingID: string
) {
  const courseOffering = await CourseOfferingModel.findOne({
    _id: courseOfferingID,
    deletedAt: null,
  });

  if (!courseOffering) {
    throw new NotFoundError("Course offering not found");
  }

  const currentTime = new Date();
  const staffs = await StaffRoleModel.find({
    courseOffering: courseOfferingID,
    deletedAt: null,
    startAt: { $lte: currentTime },
    $or: [{ expiredAt: { $gte: currentTime } }, { expiredAt: null }],
  });

  const staffIDs = staffs.map((staff) => staff.userID);

  const admins = await UserModel.find({
    role: { $in: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN] },
    deletedAt: null,
  });

  const adminIDs = admins.map((admin) => admin._id);

  return Array.from(new Set([...staffIDs, ...adminIDs]));
}

export async function checkIfUserExists(userID: string) {
  return await UserModel.exists({
    _id: userID,
    deletedAt: null,
  });
}
