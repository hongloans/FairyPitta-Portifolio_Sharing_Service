import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findByUserId({ user_id }) {
    const projectlist = await ProjectModel.find({ user_id: user_id });
    return projectlist;
  }

  static async findById({ id }) {
    const Project = await ProjectModel.findOne({ id: id });
    return Project;
  }


  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async findBySearchWord({ searchOpt }) {
    const projectlist = await ProjectModel.find({ $or: searchOpt });
    return projectlist;
  }
}

export { Project };
