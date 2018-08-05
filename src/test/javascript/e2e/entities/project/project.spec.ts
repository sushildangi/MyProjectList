/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProjectComponentsPage from './project.page-object';
import ProjectUpdatePage from './project-update.page-object';
import path from 'path';

const expect = chai.expect;

describe('Project e2e test', () => {
  let navBarPage: NavBarPage;
  let projectUpdatePage: ProjectUpdatePage;
  let projectComponentsPage: ProjectComponentsPage;
  const fileToUpload = '../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Projects', async () => {
    navBarPage.getEntityPage('project');
    projectComponentsPage = new ProjectComponentsPage();
    expect(await projectComponentsPage.getTitle().getText()).to.match(/Projects/);
  });

  it('should load create Project page', async () => {
    projectComponentsPage.clickOnCreateButton();
    projectUpdatePage = new ProjectUpdatePage();
    expect(await projectUpdatePage.getPageTitle().getAttribute('id')).to.match(/myProjectListApp.project.home.createOrEditLabel/);
  });

  it('should create and save Projects', async () => {
    projectUpdatePage.setProjectTitleInput('projectTitle');
    expect(await projectUpdatePage.getProjectTitleInput()).to.match(/projectTitle/);
    projectUpdatePage.setDescriptionInput('description');
    expect(await projectUpdatePage.getDescriptionInput()).to.match(/description/);
    projectUpdatePage.setImageInput(absolutePath);
    projectUpdatePage.setPublishedDateInput('01-01-2001');
    expect(await projectUpdatePage.getPublishedDateInput()).to.eq('2001-01-01');
    projectUpdatePage.projectLanguageSelectLastOption();
    const selectedIsPublished = await projectUpdatePage.getIsPublishedInput().isSelected();
    if (selectedIsPublished) {
      projectUpdatePage.getIsPublishedInput().click();
      expect(await projectUpdatePage.getIsPublishedInput().isSelected()).to.be.false;
    } else {
      projectUpdatePage.getIsPublishedInput().click();
      expect(await projectUpdatePage.getIsPublishedInput().isSelected()).to.be.true;
    }
    projectUpdatePage.titleSelectLastOption();
    await projectUpdatePage.save();
    expect(await projectUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
