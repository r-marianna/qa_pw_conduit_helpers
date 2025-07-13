import { test } from "@playwright/test";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";
import { generateNewUserData } from "../../src/common/testData/generateNewUserData";
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage";
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('Edit an existing article without tag', () => {
  let createArticlePage;
  let viewArticlePage;
  let article;
  let articleEdit;
  let user;

  test.beforeEach(async ({ page }) => {
    createArticlePage = new CreateArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);

    user = generateNewUserData();
    article = generateNewArticleData();
    articleEdit = generateNewArticleData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
  });

  test('Edit article Title for existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(articleEdit.title);
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForPageAppear();
    await viewArticlePage.reload();
    await viewArticlePage.assertArticleTitleIsVisible(articleEdit.title);
  });

  test('Edit the article Description for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillDescriptionField(articleEdit.description);
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForPageAppear();
    await viewArticlePage.reload();
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.assertDescriptionHasText(articleEdit.description);
  });

  test('Edit the article Text for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTextField(articleEdit.body);
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForPageAppear();
    await viewArticlePage.reload();
    await viewArticlePage.assertArticleTextIsVisible(articleEdit.body);
  });
});