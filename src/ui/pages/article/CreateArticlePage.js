import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagsX = page.locator('div').locator('span').locator('i');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async waitForPageAppear() {
    await test.step('Wait for page to appear', async () => {
      await this.tagsField.waitFor({ state: 'visible' });
    })
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill Tags field`, async () => {
      for (const tag of tags) {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    })
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.clear();
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.clear();
    });
  }

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.clear();
    });
  }
  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async deleteTags() {
    await test.step(`Delete all tags by clicking`, async () => {
      while (await this.tagsX.nth(0).isVisible()) {
        await this.tagsX.nth(0).click();
      }
    });
  }

  async deleteNTags(number) {
    await test.step(`Delete n tags by clicking`, async () => {
      while (number) {
        await this.tagsX.nth(0).click();
        number--;
      }
    });
  }

  async assertDescriptionHasText(description) {
    await test.step('Assert Description has text', async () => {
      await expect(this.descriptionField).toHaveValue(description);
    })
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillAndPublishNewArticle(article) {
    await test.step('Fill and publish new article with tags', async () => {
      await this.fillTitleField(article.title);
      await this.fillDescriptionField(article.description);
      await this.fillTextField(article.body);
      await this.fillTagsField(article.tags);
      await this.clickPublishArticleButton();
    });
  }
}
