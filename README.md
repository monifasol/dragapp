Drag and drop application


An app which lets you drag and drop items from one box to another.

You'll have 20 Pixar characters representing apps which you will be able to install or uninstall from your chest of apps.


Install
-------
Git clone the app in the desired directory
<pre><code>git clone git@github.com:monifasol/dragapp.git</code></pre>

In console:
Go to that directory. If the desired version for ruby is not installed in the system it will raise an error, if so, install it.
Then:
<pre><code>bundle install</code></pre>
<pre><code>rake db:create</code></pre>
<pre><code>rake db:migrate</code></pre>
<pre><code>rake db:seed</code></pre>
<pre><code>rails server</code></pre>

In your browser, run localhost:3000

Start playing with your Pixar apps.

