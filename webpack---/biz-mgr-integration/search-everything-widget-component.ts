import { ModuleRegistry } from 'react-module-container';
import { COMPONENT_MODULE_NAME } from './config';
import { SearchEverythingWidget } from '../index';

ModuleRegistry.registerComponent(COMPONENT_MODULE_NAME, () => SearchEverythingWidget);
