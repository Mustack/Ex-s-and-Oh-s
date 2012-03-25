from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'tictactoe.app.views.home'),
    url(r'home/', 'tictactoe.app.views.home'),
    url(r'main/', 'tictactoe.app.views.main'),
    url(r'logout/', 'tictactoe.app.views.logout_view'),
    url(r'increment/', 'tictactoe.app.views.increment')
    # url(r'^tictactoe/', include('tictactoe.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
