import { element, by, ElementFinder } from 'protractor';

export default class ProjectUpdatePage {
  pageTitle: ElementFinder = element(by.id('myProjectListApp.project.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  projectTitleInput: ElementFinder = element(by.css('input#project-projectTitle'));
  descriptionInput: ElementFinder = element(by.css('textarea#project-description'));
  imageInput: ElementFinder = element(by.css('input#file_image'));
  publishedDateInput: ElementFinder = element(by.css('input#project-publishedDate'));
  projectLanguageSelect: ElementFinder = element(by.css('select#project-projectLanguage'));
  isPublishedInput: ElementFinder = element(by.css('input#project-isPublished'));
  titleSelect: ElementFinder = element(by.css('select#project-title'));

  getPageTitle() {
    return this.pageTitle;
  }

  setProjectTitleInput(projectTitle) {
    this.projectTitleInput.sendKeys(projectTitle);
  }

  getProjectTitleInput() {
    return this.projectTitleInput.getAttribute('value');
  }

  setDescriptionInput(description) {
    this.descriptionInput.sendKeys(description);
  }

  getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  setImageInput(image) {
    this.imageInput.sendKeys(image);
  }

  getImageInput() {
    return this.imageInput.getAttribute('value');
  }

  setPublishedDateInput(publishedDate) {
    this.publishedDateInput.sendKeys(publishedDate);
  }

  getPublishedDateInput() {
    return this.publishedDateInput.getAttribute('value');
  }

  setProjectLanguageSelect(projectLanguage) {
    this.projectLanguageSelect.sendKeys(projectLanguage);
  }

  getProjectLanguageSelect() {
    return this.projectLanguageSelect.element(by.css('option:checked')).getText();
  }

  projectLanguageSelectLastOption() {
    this.projectLanguageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  getIsPublishedInput() {
    return this.isPublishedInput;
  }
  titleSelectLastOption() {
    this.titleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  titleSelectOption(option) {
    this.titleSelect.sendKeys(option);
  }

  getTitleSelect() {
    return this.titleSelect;
  }

  getTitleSelectedOption() {
    return this.titleSelect.element(by.css('option:checked')).getText();
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
