import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await awardAuthService.addAward({
      user_id,
      title,
      description,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get(
  "/award/:id",
  async function (req, res, next) {
    try {
      const awardId = req.params.id;
      const award = await awardService.getAward({ awardId });

      if (award.errorMessage) {
        throw new Error(award.errorMessage);
      }

      res.status(200).send(award);
    } catch (error) {
      next(error);
    }
  }
);



export { awardRouter };
