import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.headerArticleDetailsLocator = page.locator('div.article-meta').nth(0);
    this.headerArticleAuthorName = this.headerArticleDetailsLocator
      .locator('a.author').nth(0);
    this.editButtonHeader = this.headerArticleDetailsLocator
      .locator('a').filter({ hasText: 'Edit Article' });
    this.deleteButtonHeader = page.getByRole('button', {
      name: 'Delete Article'
    }).first();
    this.bodyArticleDetailsLocator = page.locator('div .article-meta').nth(1);
    this.bodyArticleAuthorName = this.bodyArticleDetailsLocator
      .locator('a.author').nth(0);
    this.editButtonBody = page.getByRole('button', {
      name: ' Edit Article'
    }).last();
    this.deleteButtonBody = page.getByRole('button', {
      name: 'Delete Article'
    }).last();

    this.tagsRow = page.getByRole('list').nth(1);
    this.commentTextarea = page.getByPlaceholder('Write a comment...');
    this.commentButton = page.getByRole('button', { name: 'Post Comment' });
  }

  async reload() {
    await test.step('Reload', async () => {
      await this.page.reload();
    })
  }

  async waitForPageAppear() {
    await test.step('Wait for page to appear', async () => {
      await this.articleTitleHeader.waitFor({ state: 'visible' });
    })
  }

  async clickEditArticleButton() {
    await test.step('Click [Edit Article] button', async () => {
      await this.editButtonHeader.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct Title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsToContainText(tags) {
    await test.step(`Assert the article have Tags'`, async () => {
      for (let i = 0; i < await tags.length; i++) {
        await expect(this.tagsRow).toContainText(tags[i]);
      }
    });
  }

  async assertArticleTagsDoNotContainText(tags) {
    await test.step(`Assert the article don't have deleted Tags'`, async () => {
      for (let i = 0; i < await tags.length; i++) {
        await expect(this.tagsRow).not.toContainText(tags[i]);
      }
    });
  }
}
