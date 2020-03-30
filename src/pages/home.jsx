import React from 'react';
import {
  Button,
  Container,
  Header,
  Segment,
} from 'semantic-ui-react';

import AppShell from 'federated_library_boilerplate/AppShell';
import Hero from 'federated_library_boilerplate/Hero';

import navItems from '../nav-items';

export default function HomePage({ blogs }) {
  return (
    <AppShell
      menuItems={navItems.menuItems}
      secondaryMenuItems={navItems.secondaryMenuItems}
      heading={() => (
        <Hero>
          <Container text>
            <h1>Federated Blog</h1>
            <h2>
              a blog boilerplate powered by Webpack 5 Module Federation
            </h2>
          </Container>
        </Hero>
      )}
    >
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          {Object.keys(blogs).map(key => (
            <React.Fragment key={key}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                {blogs[key].title}
              </Header>
              {blogs[key].secondaryTitle && (
                <p>
                  {blogs[key].secondaryTitle}
                </p>
              )}
              <Button
                as="a"
                size="large"
                href={`/blog/${key}`}
              >
                Read More
              </Button>
            </React.Fragment>
          ))}
        </Container>
      </Segment>
    </AppShell>
  );
}
