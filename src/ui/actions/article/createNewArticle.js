import { test } from "@playwright/test";
import { CreateArticlePage } from "../../pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../pages/article/ViewArticlePage";
import { HomePage } from "../../pages/HomePage";

export async function createNewArticle(page, article) {
  await test.step(`Create new article without tags`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();

    await createArticlePage.fillAndPublishNewArticle(article);

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.body);
  });
}