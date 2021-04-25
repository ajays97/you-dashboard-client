/* eslint-disable react/prop-types */
import { Container, interfaces } from 'inversify';
import React, { useContext } from 'react';

// Defines the context to support the container.
interface ContainerContext {
  container: Container | null;
}

/**
 * Defines the context to use Inversify
 * container to resolve dependencies.
 */
const InversifyContext = React.createContext<ContainerContext>({
  container: null
});

// Defines props for the provider.
interface ContainerProviderProps {
  container: Container;
}

/**
 * Defines the React component to provide
 * the container to the child components.
 */
export const ContainerProvider: React.FC<ContainerProviderProps> = ({
  container,
  children
}) => (
  <InversifyContext.Provider value={{ container }}>
    {children}
  </InversifyContext.Provider>
);

/**
 * Defines the hook used to resolve a dependency in a component.
 */
export default function useInjection<T>(
  identifier: interfaces.ServiceIdentifier<T>
): T {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error('The container should not be null');
  }
  try {
    return container.get<T>(identifier);
  } catch (e) {
    return container.resolve<T>(identifier as interfaces.Newable<T>);
  }
}
