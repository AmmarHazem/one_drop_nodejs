import path from "path";
import fs from "fs";
import CustomErrors from "../errors";

export const uploadFile = async (request, response) => {
  if (!request.files || !request.files.file) {
    throw new CustomErrors.BadRequestError("file is required");
  }
  const file = request.files.file;
  const maxSize = 1024 * 1024 * 50;
  if (file.size > maxSize) {
    throw new CustomErrors.BadRequestError(
      `file size must be ${maxSize} bytes or less`
    );
  }
  const fileName = file.name.toLocaleLowerCase().replaceAll(" ", "-");
  const userDir = `user-uploads/${request.session.user.id}`;
  const fileDirPath = path.join(__dirname, `../public/${userDir}`);
  const imagePath = path.join(fileDirPath, fileName);
  if (!fs.existsSync(fileDirPath)) {
    fs.mkdirSync(fileDirPath);
  }
  await file.mv(imagePath);
  return response.json({
    url: `${process.env.ORIGIN}/${userDir}/${fileName}`,
  });
};
