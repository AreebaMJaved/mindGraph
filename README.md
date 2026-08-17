# MindGraph

MindGraph is an interactive knowledge mapping application built with React and TypeScript. It allows users to create concepts, organize them into categories, visually connect related ideas, and build a personal knowledge graph directly in the browser.

The application is designed to make complex information easier to understand by turning traditional notes and disconnected concepts into a structured visual map.

## Overview

MindGraph provides a visual workspace where users can create and manage knowledge nodes.

Each concept contains a title, category, and description. Concepts can be moved around the canvas and connected to other concepts to represent relationships.

For example, a developer learning React can create a graph such as:

React

Components

Hooks

useEffect

State

Props

The relationships between these concepts can then be represented visually through connections.

All graph data is stored locally in the browser, making the application completely frontend based.

## Features

### Interactive Knowledge Graph

Create a visual network of concepts and relationships.

Users can:

Create concepts

Edit concepts

Delete concepts

Move nodes around the canvas

Connect related concepts

Remove connections

Zoom into the graph

Pan across the workspace

Navigate through the minimap

### Concept Management

Every concept contains:

Title

Category

Description

Each concept can be edited through the concept editor panel.

Users can update the information at any time without rebuilding the graph.

### Visual Connections

Concepts can be connected using React Flow handles.

Drag from the connection point of one node to another node to create a relationship.

This allows users to visually represent relationships such as:

JavaScript → React

React → Components

React → Hooks

Hooks → useEffect

### Search

The built in search field allows users to quickly locate concepts.

Search works across:

Concept titles

Descriptions

Categories

Matching concepts remain visible while unrelated concepts are visually reduced.

### Categories

Concepts can be organized using categories.

The sidebar automatically displays the categories currently being used in the knowledge graph.

This makes larger graphs easier to understand and navigate.

### Local Data Persistence

MindGraph uses browser local storage through Zustand persistence.

The graph remains available after refreshing the browser.

No external database is required for the current version.

### Graph Controls

The workspace provides controls for:

Zooming

Panning

Fitting the graph to the screen

Navigating through the minimap

The graph canvas can be scrolled and navigated without displaying unnecessary scrollbars.

### Responsive Interface

The interface is designed to adapt to different screen sizes.

The layout supports:

Desktop screens

Laptop screens

Tablet screens

Smaller displays

### Theme Support

MindGraph supports light and dark interface modes.

Users can switch between themes from the main header.

### Concept Editor

Clicking a concept opens the editor panel.

Users can modify:

Title

Category

Description

Changes are applied directly to the selected node.

### Reset Workspace

The reset option restores the original example knowledge graph.

This is useful when testing the application or starting a new demonstration.

## How to Use

### Create a Concept

Click the New Concept button.

Enter:

Title

Category

Description

Then save the concept.

The new concept will appear on the graph.

### Move a Concept

Click and hold the main body of a node.

Drag it to the desired position.

The node position is automatically stored.

### Connect Concepts

Each node has connection handles.

The top handle receives a connection.

The bottom handle creates a connection.

Drag from the bottom handle of one concept to the top handle of another concept.

A connection will be created between them.

### Edit a Concept

Click a node.

The Edit Concept panel will open.

Update the required information and select Save Changes.

### Delete a Concept

Select a concept and use the Delete Concept option from the editor.

Any connections belonging to that concept are removed automatically.

### Search Concepts

Use the search field in the header.

Enter a concept name, category, or keyword from the description.

The graph will highlight matching concepts.

### Navigate the Graph

Use the mouse wheel to zoom.

Drag the empty canvas area to move around the graph.

Use the controls in the bottom corner for additional navigation.

The minimap can also be used to quickly navigate larger graphs.

## Example Knowledge Map

A React learning map could look like:

```text
JavaScript
    |
   React
   /   \
Components  Hooks
              |
          useEffect
              |
             State