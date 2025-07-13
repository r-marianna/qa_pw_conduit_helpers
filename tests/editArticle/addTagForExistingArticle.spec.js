import { test } from "@playwright/test";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";
import { generateNewUserData } from "../../src/common/testData/generateNewUserData";
import { CreateArticlePage } from "../../src/ui/pages/article/CreateArticlePage";
import { ViewArticlePage } from "../../src/ui/pages/article/ViewArticlePage";
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('Edit an existing article with tags', () => {
  let createArticlePage;
  let viewArticlePage;
  let article;
  let articleEdit;
  let user;

  let randomNumber = Math.floor(Math.random() * 10);

  test.beforeEach(async ({ page }) => {
    createArticlePage = new CreateArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);

    user = generateNewUserData();
    articleEdit = generateNewArticleData(randomNumber);

    await signUpUser(page, user);
  });

  test('Add the Tag for the existing article without tags',
    async ({ page }) => {
      article = generateNewArticleData();
      await createNewArticle(page, article);

      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTagsField(articleEdit.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(articleEdit.tags);
    });

  test('Add the Tag for the existing article with tags',
    async ({ page }) => {
      article = generateNewArticleData(randomNumber);
      await createNewArticle(page, article);

      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.deleteTags();
      await createArticlePage.fillTagsField(articleEdit.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(articleEdit.tags);
      await viewArticlePage.assertArticleTagsDoNotContainText(article.tags);
    });

});